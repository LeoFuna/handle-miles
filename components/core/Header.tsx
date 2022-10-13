import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import { MenuBook } from "@mui/icons-material";
import { signOut } from "next-auth/react";

function Header({ title = 'Visão Geral', name }: { title?: string; name: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleUserOpenMenu = (event: MouseEvent<HTMLButtonElement>) => setUserAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleUserCloseMenu = () => setUserAnchorEl(null);
  const open = Boolean(anchorEl);
  const openUserMenu = Boolean(userAnchorEl);

  return (
    <AppBar position='static'>
      <Box sx={{ height: '70px', display: 'flex', alignItems: 'center' }} >
        <Box width='30vw' m={5} sx={{ display: 'flex', justifyContent: 'start' }}>
          <Image width={50} height={50} alt='logo' src='/airplane-logo.png' />
        </Box>

        <Box width='40vw' sx={{ display: 'center', justifyContent: 'center' }}>
          <Typography variant='h3'>{title}</Typography>
        </Box>

        <Box width='30vw' m={5} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Tooltip title='Menu'>
            <IconButton sx={{ marginRight: '30px' }} onClick={handleOpenMenu}>
              <MenuBook fontSize='large' />
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
            <IconButton onClick={handleUserOpenMenu} sx={{ p: 0 }}>
              <Avatar>{name[0]}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={userAnchorEl}
            open={openUserMenu}
            onClose={handleUserCloseMenu}
          >
            <MenuItem onClick={() => signOut()}>
              <Typography>Sair</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </AppBar>
  );
}

export default Header;
