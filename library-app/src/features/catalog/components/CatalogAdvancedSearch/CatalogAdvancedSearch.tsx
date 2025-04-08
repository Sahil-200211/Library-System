import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Stack, Box } from "@mui/material";
import { motion } from "framer-motion";

export const CatalogAdvancedSearch: React.FC = () => {
  const navigate = useNavigate();

  const isbnRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const genreRef = useRef<HTMLInputElement>(null);

  const search = () => {
    let query = "";

    if (isbnRef.current?.value) query += `?barcode=${isbnRef.current.value}`;
    if (titleRef.current?.value) query += query ? `&title=${titleRef.current.value}` : `?title=${titleRef.current.value}`;
    if (authorRef.current?.value) query += query ? `&author=${authorRef.current.value}` : `?author=${authorRef.current.value}`;
    if (descriptionRef.current?.value) query += query ? `&description=${descriptionRef.current.value}` : `?description=${descriptionRef.current.value}`;
    if (subjectRef.current?.value) query += query ? `&subject=${subjectRef.current.value}` : `?subject=${subjectRef.current.value}`;
    if (genreRef.current?.value) query += query ? `&genre=${genreRef.current.value}` : `?genre=${genreRef.current.value}`;

    navigate(`/catalog${query}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          backgroundColor: "#F8F4FF",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Advanced Book Search
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Fill in as many or few fields to narrow down your search
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {[
            { label: "ISBN", ref: isbnRef },
            { label: "Title", ref: titleRef },
            { label: "Author", ref: authorRef },
            { label: "Description", ref: descriptionRef },
            { label: "Subject", ref: subjectRef },
            { label: "Genre", ref: genreRef },
          ].map(({ label, ref }) => (
            <TextField
              key={label}
              inputRef={ref}
              label={label}
              variant="outlined"
              size="small"
              sx={{ minWidth: 180, m: 1 }}
            />
          ))}
        </Stack>

        <Box sx={{ mt: 3, width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={search}
            sx={{ borderRadius: 2, px: 4 }}
          >
            Search
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};
