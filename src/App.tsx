import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Fade,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import axios from "axios";
import { useTranslation } from "react-i18next";
import GB from "country-flag-icons/react/3x2/GB";
import TR from "country-flag-icons/react/3x2/TR";

interface ShortenResponse {
  shortCode: string;
  longUrl: string;
}

function App() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<ShortenResponse | null>(
    null
  );
  const [searchResult, setSearchResult] = useState<ShortenResponse | null>(
    null
  );
  const [error, setError] = useState("");
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [clickCount, setClickCount] = useState<number | null>(null);

  const API_BASE_URL = "http://localhost:8080";
  const FRONTEND_URL = "http://localhost:5173";

  const handleLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shortCode) {
      setError("Kısa kod zorunludur");
      return;
    }

    if (shortCode.length < 5 || shortCode.length > 20) {
      setError("Kısa kod 5-20 karakter arasında olmalıdır");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, {
        longUrl,
        shortCode,
      });

      setShortenedUrl(response.data);
      const clickResponse = await axios.get(
        `${API_BASE_URL}/${shortCode}/clicks`
      );
      setClickCount(clickResponse.data);

      setError("");
      setShowSuccessAlert(true);
      setLongUrl("");
    } catch (err) {
      setError("URL kısaltılırken bir hata oluştu");
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/url/${searchCode}`);
      setSearchResult(response.data);
      const clickResponse = await axios.get(
        `${API_BASE_URL}/${searchCode}/clicks`
      );
      setClickCount(clickResponse.data);
      setError("");
    } catch (err) {
      setError("Kısa URL bulunamadı");
      setSearchResult(null);
      setClickCount(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyAlert(true);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ minHeight: "90vh" }}>
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            onClick={handleLanguageMenu}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              padding: "8px",
            }}
          >
            {i18n.language === "tr" ? (
              <TR style={{ width: "24px", height: "24px" }} />
            ) : (
              <GB style={{ width: "24px", height: "24px" }} />
            )}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              <GB style={{ width: "20px", marginRight: "8px" }} /> English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("tr")}>
              <TR style={{ width: "20px", marginRight: "8px" }} /> Türkçe
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            {t("title")}
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 6,
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <LinkIcon color="primary" />
            <Typography variant="h6">{t("urlShorten.title")}</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t("urlShorten.longUrl")}
              variant="outlined"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label={t("urlShorten.shortCode")}
              variant="outlined"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              helperText={t("urlShorten.shortCodeHelper")}
              required
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mb: 2 }}
            >
              {t("urlShorten.shortenButton")}
            </Button>
          </form>

          {shortenedUrl && (
            <Box sx={{ mt: 4 }}>
              <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Link
                    href={`${FRONTEND_URL}/${shortCode}`}
                    target="_blank"
                    rel="noopener"
                  >
                    {`${FRONTEND_URL}/${shortCode}`}
                  </Link>
                  <Button
                    startIcon={<ContentCopyIcon />}
                    onClick={() =>
                      copyToClipboard(`${FRONTEND_URL}/${shortCode}`)
                    }
                  >
                    {t("urlShorten.copy")}
                  </Button>
                </Box>
                {clickCount !== null && (
                  <Typography sx={{ mt: 1 }}>
                    {t("urlShorten.clickCount", { count: clickCount })}
                  </Typography>
                )}
              </Paper>
            </Box>
          )}
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 6,
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <SearchIcon color="primary" />
            <Typography variant="h6">{t("urlSearch.title")}</Typography>
          </Box>
          <form onSubmit={handleSearch}>
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label={t("urlShorten.shortCode")}
                variant="outlined"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{ px: 4 }}
              >
                {t("urlSearch.searchButton")}
              </Button>
            </Box>
          </form>

          {searchResult && (
            <Box sx={{ mt: 4 }}>
              <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="subtitle1" gutterBottom>
                  {t("urlSearch.shortUrl")}{" "}
                  <Link
                    href={`${FRONTEND_URL}/${searchResult.shortCode}`}
                    target="_blank"
                    rel="noopener"
                  >
                    {`${FRONTEND_URL}/${searchResult.shortCode}`}
                  </Link>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {t("urlSearch.originalUrl")}{" "}
                  <Link
                    href={searchResult.longUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    {searchResult.longUrl}
                  </Link>
                </Typography>
                {clickCount !== null && (
                  <Typography variant="subtitle1">
                    {t("urlSearch.clickCount", { count: clickCount })}
                  </Typography>
                )}
              </Paper>
            </Box>
          )}
        </Paper>

        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={4000}
            onClose={() => setError("")}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        )}

        <Snackbar
          open={showCopyAlert}
          autoHideDuration={2000}
          onClose={() => setShowCopyAlert(false)}
        >
          <Alert severity="success">{t("urlShorten.copied")}</Alert>
        </Snackbar>

        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={3000}
          onClose={() => setShowSuccessAlert(false)}
        >
          <Alert severity="success">{t("urlShorten.success")}</Alert>
        </Snackbar>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 4,
          backgroundColor: (theme) => theme.palette.grey[100],
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} URL Shortener. All rights reserved.
            </Typography>
            <Tooltip
              title="GitHub"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <IconButton
                href="https://github.com/yusufpeksen"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.2s",
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
