import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import { MenuBook } from "@mui/icons-material";
import { signOut } from "next-auth/react";

function Header({ title = 'Visão Geral' }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <AppBar position='static'>
      <Box sx={{ height: '50px', display: 'flex', alignItems: 'center' }} >
        <Box width='30vw' sx={{ display: 'flex', justifyContent: 'start' }}>
          <Image width={50} height={50} alt='logo' src='/airplane-logo.png' />
        </Box>

        <Box width='40vw' sx={{ display: 'center', justifyContent: 'center' }}>
          <Typography variant='h4'>{title}</Typography>
        </Box>

        <Box width='30vw' sx={{ display: 'flex', justifyContent: 'end' }}>
          <Tooltip title='Menu'>
            <IconButton onClick={handleOpenMenu}>
              <MenuBook />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => router.push('/')}>
              <Typography>Dashboard</Typography>
            </MenuItem>
            <MenuItem onClick={() => router.push('/transactions')}>
              <Typography>Movimentações</Typography>
            </MenuItem>
            <MenuItem onClick={() => router.push('/settings')}>
              <Typography>Configurações</Typography>
            </MenuItem>
          </Menu>
          <Tooltip title='Usuário'>
            <IconButton onClick={() => signOut()} sx={{ p: 0 }}>
              <Avatar />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </AppBar>
  );
}

export default Header;
