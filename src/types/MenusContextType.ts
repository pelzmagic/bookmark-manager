export type MenusContextType = {
  openId: number | string;
  close: () => void;
  open: (id: number | string) => void;
};
