import type { FC, ReactNode } from "react";
import style from "./Modal.module.css"

interface IModal {
  children: ReactNode;
  open: boolean
  close: () => void
}

export const Modal: FC<IModal> = (props) => {
  const { children, open, close } = props;
  if(!open) return null

  return (
    <div className={style.overlay} onClick={close}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={close}>x</button>
        {children}
        </div>
    </div>
);
};
