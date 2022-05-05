import { Typography, Card, CardContent } from '@mui/material';

export default function CustomCard({ title, cost }) {
    return (
        <Card sx={{ maxWidth: '200px', overflow: 'auto' }} variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: { md: 20, sx: '1em' } }} color="text.secondary" gutterBottom textAlign="center">
                    {title}
                </Typography>
                <Typography
                    sx={{
                        fontSize: { md: 30, sx: 30 },
                        fontWeight: 'bold'
                    }} color="text.secondary" gutterBottom textAlign="center"
                >
                    {typeof cost == 'number' ? cost.toFixed(2) : null}₪
                </Typography>
            </CardContent>
        </Card>
    )
}