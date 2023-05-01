import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

export default function UploadVideos() {

    const [open, setOpen] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);
  
    const progressRef = React.useRef(() => {});

    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };


    const handleFileInputChange = (event) => {
      // setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0])
      const data = new FormData();
      data.append('file', event.target.files[0]);
      data.append('filename',"uplaodededmedia.jpg");
      fetch('/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        console.log(response)
        // response.json().then((body) => {
        //   this.setState({ imageURL: `http://5500:8000/${body.file}` });
        // });
      });

    };
  
    const handleOpenF = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.multiple = false;
      input.onchange = handleFileInputChange;
      input.click();
    };


    React.useEffect(() => {
        const timer = setInterval(() => {
          progressRef.current();
        }, 500);
    
        return () => {
          clearInterval(timer);
        };
      }, []);

    
      React.useEffect(() => {
        progressRef.current = () => {
          if (progress > 100) {
            setProgress(0);
            setBuffer(10);
          } else {
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            setProgress(progress + diff);
            setBuffer(progress + diff + diff2);
          }
        };
      });

  return (
    
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 10,
        width: 300,
        height: 800,
      },
    }}
  >


 <Paper elevation={24} >
 <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
 <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
  onClick={handleClose}
>
  <CircularProgress color="inherit" />
</Backdrop>

    <Button  onClick={handleOpenF}
    variant="contained" component="label"
        style={{
            width:'230px',
            height:'230px',
            marginTop:"100px"
        }}
    >
        Upload

      </Button>
    </Paper>
  </Box>

  );

}
