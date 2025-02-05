import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
  res.end(`<!DOCTYPE html>
<html>

<head>
  <meta name="go-import" content="m7s.live/v5 git https://github.com/langhuihui/monibuca">
  <meta name="go-source"
    content="m7s.live/v5 _ https://github.com/langhuihui/monibuca/tree/v5{/dir} https://github.com/langhuihui/monibuca/blob/v5{/dir}/{file}#L{line}">
  <meta http-equiv="refresh" content="0; url=https://pkg.go.dev/m7s.live/v5">
</head>

<body>
  Nothing to see here. Please <a href="https://pkg.go.dev/m7s.live/v5">move along</a>.
</body>

</html>
  `);
}
