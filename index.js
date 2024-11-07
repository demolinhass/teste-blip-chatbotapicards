const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/api/repos', async (req, res) => {
  try {

    const response = await axios.get('https://api.github.com/orgs/takenet/repos', {
      params: { per_page: 100, sort: 'created', direction: 'asc' },
    });


    const csRepos = response.data.filter(repo => repo.language === 'C#').slice(0, 5);


    const reposData = csRepos.map(repo => ({
      name: repo.full_name,
      description: repo.description,
      avatar_url: repo.owner.avatar_url,
    }));

    res.json(reposData);
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    res.status(500).json({ error: 'Erro ao buscar repositórios' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
