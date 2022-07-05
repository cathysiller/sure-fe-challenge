import InstructionsBar from './InstructionsBar';
import { renderWithProviders } from '../../utils/test';
import { render, screen,  waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('InstructionsBar', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };

  const onDismissMock = jest.fn();


  it('should render a "View challenges" button', async () => {
    const { getByText } = renderWithProviders(<InstructionsBar {...defaultProps} />);
    expect(getByText('View challenges')).toBeInTheDocument();
  });

  // TODO: Challenge 3
  it('should call the onClick prop when the button is clicked', async () => {
    const onKeyDownMock = jest.fn();
    renderWithProviders(<InstructionsBar {...defaultProps} />);

    // KeyDown on date input
    const viewBtn = screen.getByText('View challenges');
    user.click(viewBtn);

    expect(onDismissMock).toBeCalledTimes(1);
  });
});
