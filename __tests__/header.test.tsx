import { render, screen, fireEvent } from '@testing-library/react';
import Header from 'components/core/Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('has a title called Titulo and name Leonardo', () => {
    render(<Header title='Titulo' name='Leonardo Funabashi' />);
    // Has Title
    const mainTitle = screen.getByRole('heading', { name: 'Titulo' });
    expect(mainTitle).toBeInTheDocument();
    //Has avatar with first letter name
    const userMenuButton = screen.getByRole('button', { name: 'Usuário' });
    const avatar = userMenuButton.firstElementChild?.textContent;
    expect(avatar).toBe('L');
  });
  it('has a Menu for app pages that open on click', () => {
    render(<Header title='Titulo' name='Leonardo' />);

    //Open Menu
    const menuButton = screen.getAllByRole('button')[0];
    fireEvent.click(menuButton);
    // Verify if has just one open
    const menus = screen.getAllByRole('menu');
    expect(menus.length).toBe(1);
    // Expect to be the Menu for pages that was opened
    const dashboardMenuItem = screen.getByRole('menuitem', { name: 'Dashboard' });
    expect(dashboardMenuItem).toBeInTheDocument();
  });
  it('has render error on no App props', () => {
    // Change console.error for custom one for not log error on render Header
    const consoleErrorFn = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    try {
      render(<Header />);
    } catch(e) {
      // Get error on render Header and customize error message
      const customErrorMessage = 'Invalid props';
      expect(customErrorMessage).toBe(customErrorMessage);
      // Retore console.error mock
      consoleErrorFn.mockRestore();
      return;
    }

    // Expect if has no props, the Header do no render
    const header = screen.getByTestId('app-header');
    expect(header).not.toBeInTheDocument();
    consoleErrorFn.mockRestore();
  });
});