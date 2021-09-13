import React from "react"
import Highlight from "prism-react-renderer"
import Prism from "prism-react-renderer/prism";
import theme from "prism-react-renderer/themes/nightOwl"

import CopyCodeBlock from "../copy-code-block"

(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-shell-session");
require("prismjs/components/prism-qsharp");
require("prismjs/components/prism-aspnet");
require("prismjs/plugins/command-line/prism-command-line");

function getParams(className = ``) {
  const [lang = ``, params = ``] = className.split(`:`)

  return [
    lang.split(`language-`).pop().split(`{`).shift(),
  ].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`)
      merged[key] = value
      return merged
    }, {})
  )
}

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))
  return (index) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    )
    return inRange
  }
}

export const CodeBlock = ({
  codeString,
  noLineNumbers = true,
  className,
  metastring = ``,
}) => {
  const showLineNumbers = true;
  const showCopyButton = true;

  const [language, { title = `` }] = getParams(className)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  const hasLineNumbers = !noLineNumbers && language !== `noLineNumbers` && showLineNumbers

  return (
    <Highlight Prism={Prism} code={codeString} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {title && (
            <div className="code-title">
              <div>{title}</div>
            </div>
          )}
          <div className="gatsby-highlight" data-language={language}>
            <pre className={className} style={style} data-linenumber={hasLineNumbers}>
              {showCopyButton && <CopyCodeBlock content={codeString} fileName={title} />}
              <code className={`language-${language}`}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })

                  if (shouldHighlightLine(i)) {
                    lineProps.className = `${lineProps.className} highlight-line`
                  }

                  return (
                    <div {...lineProps}>
                      {hasLineNumbers && <span className="line-number-style">{i + 1}</span>}
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  )
                })}
              </code>
            </pre>
          </div>
        </React.Fragment>
      )}
    </Highlight>
  )
}
