import type { VercelRequest, VercelResponse } from '@vercel/node'

const engineHTML = `
<!DOCTYPE html>
<html>

<head>
  <meta name="go-import" content="m7s.live/engine/v4 git https://github.com/Monibuca/engine">
  <meta name="go-source"
    content="m7s.live/engine/v4 _ https://github.com/Monibuca/engine/tree/v4{/dir} https://github.com/Monibuca/engine/tree/v4{/dir}/{file}#L{line}">
  <meta http-equiv="refresh" content="0; url=https://pkg.go.dev/m7s.live/engine/v4">
</head>

<body>
  Nothing to see here. Please <a href="https://pkg.go.dev/m7s.live/engine/v4">move along</a>.
</body>

</html>
`

export default function (req: VercelRequest, res: VercelResponse) {
  res.end(engineHTML)
}
