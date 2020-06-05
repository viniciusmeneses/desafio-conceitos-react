import React, { useEffect, useState, useCallback } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const handleAddRepository = useCallback(() => {
    api
      .post("repositories", {
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      })
      .then(({ data: newRepository }) => setRepositories(repositories => [...repositories, newRepository]));
  }, [setRepositories]);

  const handleRemoveRepository = useCallback(repositoryId => () => {
    api
      .delete(`repositories/${repositoryId}`)
      .then(({ status }) => status === 204 && setRepositories(repositories => repositories.filter(r => r.id !== repositoryId)));
  }, [setRepositories]);

  useEffect(() => {
    api
      .get("repositories")
      .then(({ data }) => setRepositories(data));
  }, [setRepositories]);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
  
            <button onClick={handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
