import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function Modal({ open }) {
          const modalContent = useSelector((state) => state.modal.modalContent);
          const width = useSelector((state) => state.modal.modalWidth);
          const height = useSelector((state) => state.modal.modalHeight);
          const rounded = useSelector((state) => state.modal.modalRounded);
          return (
                    // backdrop
                    <div
                              className={`
                                        fixed inset-0 flex justify-center items-center transition-colors
                                        ${open ? "visible bg-black/30" : "invisible"}
                              `}
                    >
                              {/* modal */}
                              <div
                                        onClick={(e) => e.stopPropagation()}
                                        className={`
                                                  bg-white transition-all 
                                                  ${width ? width : "w-auto"} 
                                                  ${height ? height : "h-auto"} 
                                                  ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                                                  ${rounded ? "rounded-xl" : "rounded-none"}
                                        `}
                              >
                               {modalContent}         
                              </div>
                    </div>
          );
}

Modal.propTypes = {
          open: PropTypes.bool.isRequired,
          width: PropTypes.string,
          height: PropTypes.string,
};
