// import { JSX } from 'react';
// import { Modal as MUIModal, Box, IconButton, Fade } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import './Modal.css';

// interface ModalProps {
//   toggleModal(): void;
//   content: JSX.Element;
// }

// export const Modal: React.FC<ModalProps> = ({ toggleModal, content }) => {
//   return (
//     <MUIModal
//       open={true}
//       onClose={toggleModal}
//       closeAfterTransition
//       BackdropProps={{
//         timeout: 300, // smoother backdrop fade
//       }}
//     >
//       <Fade in={true}>
//         <Box className="modal-bg">
//           <div className="modal">
//             <IconButton className="modal-exit" onClick={toggleModal}>
//               <CloseIcon />
//             </IconButton>
//             {content}
//           </div>
//         </Box>
//       </Fade>
//     </MUIModal>
//   );
// };

import { JSX, useState, useEffect } from 'react';
import './Modal.css';

interface ModalProps {
  toggleModal: () => void;
  content: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({ toggleModal, content }) => {
  const [animate, setAnimate] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 10); // triggers fade-in after mount

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      toggleModal();
    }, 300); // same as fade-out duration
  };

  return (
    <div className={`modal-bg ${animate && !closing ? 'fade-in' : 'fade-out'}`}>
      <div className={`modal ${animate && !closing ? 'scale-in' : 'scale-out'}`}>
        <h5 className="modal-exit" onClick={handleClose}>
          x
        </h5>
        {content}
      </div>
    </div>
  );
};


