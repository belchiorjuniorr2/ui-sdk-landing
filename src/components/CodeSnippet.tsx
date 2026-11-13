type CodeSnippetProps = {
  children: string
}

function CodeSnippet({ children }: CodeSnippetProps) {
  return (
    <pre className="code-snippet">
      <code>{children.trim()}</code>
    </pre>
  )
}

export { CodeSnippet }
