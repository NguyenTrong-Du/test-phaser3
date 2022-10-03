import { atom } from 'recoil';

export const metamaskState = atom<boolean>({
  key: 'metamask',
  default: false,
});
