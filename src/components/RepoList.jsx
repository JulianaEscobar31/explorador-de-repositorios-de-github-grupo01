import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const RepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const sortedRepos = response.data.sort((a, b) => b.size - a.size);
        const topRepos = sortedRepos.slice(0, 5);
        setRepos(topRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      <h2>Top 5 repositorios con más participación de {username}</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Repositorio</TableCell>
              <TableCell align="right">Tamaño</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repos.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell component="th" scope="row">
                  {repo.name}
                </TableCell>
                <TableCell align="right">{repo.size}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RepoList;
