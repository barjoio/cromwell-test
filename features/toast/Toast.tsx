import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../app/store";
import {
  activate,
  deactivate,
  toastDuration,
  toastVariant,
} from "./toastSlice";

const Toast = () => {
  const toast = useSelector((state: RootState) => state.toast);

  const top = toast.active ? "top-3" : "-top-[var(--nav-height)]";
  let colours;

  switch (toast.variant) {
    case toastVariant.neutral:
      colours = "text-orange-900 bg-orange-200 border-orange-300";
      break;
    case toastVariant.success:
      colours = "text-emerald-900 bg-emerald-200 border-emerald-300";
      break;
    case toastVariant.error:
      colours = "text-rose-900 bg-rose-200 border-rose-300";
      break;
  }

  return (
    <div
      className={"_toast absolute z-[1] transition-all " + top + " " + colours}
    >
      {toast.message}
    </div>
  );
};

export const activateToast = (
  dispatch: Dispatch,
  message: string,
  variant: toastVariant
) => {
  dispatch(activate({ message, variant }));
  setTimeout(() => dispatch(deactivate()), toastDuration);
};

export default Toast;
