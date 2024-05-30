import CircularProgress from '@mui/material/CircularProgress'

const Loading = ({
  contained = false,
  white = false,
  size = 24,
  customs = {},
}: {
  contained?: boolean
  white?: boolean
  size?: number
  customs?: React.CSSProperties
}) => {
  if (contained)
    return (
      <div style={{ margin: 'auto', width: 40, textAlign: 'center' }}>
        <CircularProgress size={size} style={{ ...customs }} />
      </div>
    )

  return <CircularProgress size={size} sx={{ ...customs, ...(white && { color: 'white' }) }} />
}

export default Loading
