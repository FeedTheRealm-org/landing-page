import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function PrivacyPolicy() {
    const listStyle = {
        pl: 4,
        mb: 3,
        listStyleType: 'disc',
        '& li': {
            display: 'list-item',
            marginBottom: '0.5rem',
        },
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.6))',
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    py: { xs: 6, md: 8 },
                }}
            >
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        fontSize: {
                            xs: '2.1rem',
                            sm: '2.6rem',
                            md: '3rem',
                        },
                    }}
                >
                    Privacy Policy
                </Typography>

                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 5 }}
                >
                    Last updated: June 2026
                </Typography>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 3 }}>
                    Feed the Realm respects your privacy. This Privacy Policy
                    explains what information we collect, how we use it, and
                    your rights regarding that information.
                </Typography>

                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                    Information We Collect
                </Typography>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 2 }}>
                    When you create an account, we collect:
                </Typography>

                <Box component="ul" sx={listStyle}>
                    <li>Email address</li>
                    <li>Account identifier (User ID)</li>
                </Box>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 2 }}>
                    When you make purchases, we may store:
                </Typography>

                <Box component="ul" sx={listStyle}>
                    <li>Purchase history</li>
                    <li>Transaction identifiers</li>
                </Box>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 3 }}>
                    Payment information is processed by Stripe. We do not store
                    your credit card information.
                </Typography>

                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                    How We Use Information
                </Typography>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 2 }}>
                    We use collected information to:
                </Typography>

                <Box component="ul" sx={listStyle}>
                    <li>Create and manage player accounts</li>
                    <li>Verify email addresses</li>
                    <li>Provide customer support</li>
                    <li>Process in-game purchases</li>
                    <li>Prevent fraud and abuse</li>
                </Box>

                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                    Third-Party Services
                </Typography>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 2 }}>
                    We use third-party services that may process personal
                    information on our behalf, including:
                </Typography>

                <Box component="ul" sx={listStyle}>
                    <li>Stripe (payment processing)</li>
                </Box>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 3 }}>
                    These services have their own privacy policies.
                </Typography>

                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                    Data Retention
                </Typography>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 3 }}>
                    We retain account information while your account remains
                    active or as needed to provide the game services.
                </Typography>

                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                    Data Deletion
                </Typography>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 3 }}>
                    You may request deletion of your account and associated
                    personal information by contacting us.
                </Typography>

                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                    Security
                </Typography>

                <Typography component="p" sx={{ lineHeight: 1.8, mb: 3 }}>
                    We take reasonable measures to protect your information from
                    unauthorized access, alteration, or disclosure.
                </Typography>

                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                    Contact
                </Typography>

                <Typography component="p" sx={{ lineHeight: 1.8 }}>
                    If you have questions regarding this Privacy Policy, contact:
                </Typography>

                <Typography sx={{ mt: 1, fontWeight: 600 }}>
                    atusgames.official@gmail.com
                </Typography>
            </Container>
        </Box>
    );
}

export default PrivacyPolicy;