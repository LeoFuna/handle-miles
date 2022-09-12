import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useState, MouseEvent } from "react";

function Header({ title = 'Visão Geral' }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <AppBar position='static'>
      <Container maxWidth='xl' sx={{ height: '50px', display: 'flex', alignItems: 'center' }} >
        <Box width='30vw' sx={{ display: 'flex', justifyContent: 'start' }}>
          <Image width={50} height={50} alt='logo' src='/airplane-logo.png' />
        </Box>

        <Box width='40vw' sx={{ display: 'center', justifyContent: 'center' }}>
          <Typography variant='h4'>{ title }</Typography>
        </Box>

        <Box width='30vw' sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton onClick={handleOpenMenu}>
            <Image width={50} height={50} alt='logo' src='/airplane-logo.png' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem>
              <Typography>Teste</Typography>
            </MenuItem>
          </Menu>
          <Tooltip title='Configurações'>
            <IconButton sx={{ p: 0 }}>
              <Avatar />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Header;
