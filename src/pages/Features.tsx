import { useState, useEffect } from 'react';
import { dataBasePath } from '../services/config';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Features() {
    const [background, setBackground] = useState<string>('');

    useEffect(() => {
        setBackground(`${dataBasePath}/features-page/background.jpg`);
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.6))' }} />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>Features</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 4 }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Feed the Realm - Game</Typography>
                        <Typography sx={{ mb: 2 }}>
                            Play in multiple worlds, interact with players worldwide, and embark on epic adventures.
                        </Typography>
                        <Box
                            component="ul"
                            sx={{
                                pl: 3,
                                m: 0,
                                display: 'grid',
                                gap: 1,
                                listStyleType: 'disc',
                                listStylePosition: 'outside',
                                '& li': {
                                    padding: '6px 10px',
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    transition: 'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 0 16px rgba(106,228,255,0.35)',
                                        backgroundColor: 'rgba(106,228,255,0.08)',
                                    },
                                },
                            }}
                        >
                            <Typography component="li" variant="body2">Explore and join community-created worlds from a global world feed</Typography>
                            <Typography component="li" variant="body2">Create and customize your character with a unique name, biography, and appearance</Typography>
                            <Typography component="li" variant="body2">Persist your character progress, inventory, and achievements across sessions</Typography>
                            <Typography component="li" variant="body2">Move seamlessly between zones and connected world areas through portals</Typography>
                            <Typography component="li" variant="body2">Engage in real-time multiplayer with visible player characters, nametags, and overhead chat</Typography>
                            <Typography component="li" variant="body2">Accept, track, and complete NPC-driven quests with multiple objective types</Typography>
                            <Typography component="li" variant="body2">Defeat enemies with melee, ranged, and area-of-effect weapons</Typography>
                            <Typography component="li" variant="body2">Manage stamina, inventory, equipment, consumables, and loot</Typography>
                            <Typography component="li" variant="body2">Collect dropped items, gold, and rewards from defeated enemies and treasure chests</Typography>
                            <Typography component="li" variant="body2">Equip weapons through quick-access slots and compare item statistics before use</Typography>
                            <Typography component="li" variant="body2">Purchase and use consumables, equipment, and cosmetics</Typography>
                            <Typography component="li" variant="body2">Interact with NPCs through customizable dialogue systems</Typography>
                            <Typography component="li" variant="body2">Trade gold for items through in-world shops and merchants</Typography>
                            <Typography component="li" variant="body2">Purchase gems and premium cosmetics through the integrated marketplace</Typography>
                            <Typography component="li" variant="body2">Maintain a global cosmetics inventory shared across all worlds</Typography>
                            <Typography component="li" variant="body2">Experience immersive visual effects, ambient music, and sound effects</Typography>
                            <Typography component="li" variant="body2">View detailed world information before entering an adventure</Typography>
                            <Typography component="li" variant="body2">Enjoy intelligent enemy and NPC behaviors, including combat, pursuit, and wandering</Typography>
                            <Typography component="li" variant="body2">Benefit from secure account management, authentication, and account recovery features</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Feed the Realm - World Editor</Typography>
                        <Typography sx={{ mb: 2 }}>
                            Design your own worlds with powerful tools, publish them, and share your creations with the community.
                        </Typography>
                        <Box
                            component="ul"
                            sx={{
                                pl: 3,
                                m: 0,
                                display: 'grid',
                                gap: 1,
                                listStyleType: 'disc',
                                listStylePosition: 'outside',
                                '& li': {
                                    padding: '6px 10px',
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    transition: 'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 0 16px rgba(106,228,255,0.35)',
                                        backgroundColor: 'rgba(106,228,255,0.08)',
                                    },
                                },
                            }}
                        >
                            <Typography component="li" variant="body2">Create and publish custom worlds for the Feed the Realm community</Typography>
                            <Typography component="li" variant="body2">Organize worlds into multiple interconnected zones</Typography>
                            <Typography component="li" variant="body2">Publish individual zones or entire worlds</Typography>
                            <Typography component="li" variant="body2">Place buildings, environmental objects, baseplates, slopes, and decorative assets</Typography>
                            <Typography component="li" variant="body2">Customize floor materials, colors, and visual presentation</Typography>
                            <Typography component="li" variant="body2">Define player spawn locations and enemy spawn areas</Typography>
                            <Typography component="li" variant="body2">Configure enemy spawners, NPC spawners, and loot chest placements</Typography>
                            <Typography component="li" variant="body2">Upload custom 3D models and assets for use in your worlds</Typography>
                            <Typography component="li" variant="body2">Access a library of default models and reusable content</Typography>
                            <Typography component="li" variant="body2">Create and customize enemies, NPCs, and their visual appearances</Typography>
                            <Typography component="li" variant="body2">Configure NPC dialogue trees and quest interactions</Typography>
                            <Typography component="li" variant="body2">Build complete quest chains with objectives, rewards, and dialogue integration</Typography>
                            <Typography component="li" variant="body2">Create objectives based on enemy defeats, item collection, conversations, gold acquisition, and more</Typography>
                            <Typography component="li" variant="body2">Configure quest rewards including items and currency</Typography>
                            <Typography component="li" variant="body2">Create weapons, consumables, loot tables, and item drops</Typography>
                            <Typography component="li" variant="body2">Assign enemy drop tables and loot rewards</Typography>
                            <Typography component="li" variant="body2">Build in-world shops and define purchasable items</Typography>
                            <Typography component="li" variant="body2">Set item prices using gold, gems, or both</Typography>
                            <Typography component="li" variant="body2">Create portals and link them to specific zones</Typography>
                            <Typography component="li" variant="body2">Upload world data and assets directly to the publishing service</Typography>
                            <Typography component="li" variant="body2">Monitor world and server status from the editor</Typography>
                            <Typography component="li" variant="body2">Manage world content through an improved editor interface with workflow indicators</Typography>
                            <Typography component="li" variant="body2">Share published worlds instantly through the community discovery feed</Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Features;