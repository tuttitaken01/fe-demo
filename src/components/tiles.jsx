import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export default function Tiles() {
  const [tiles, setTiles] = useState([])
  const [status, setStatus] = useState([]);
  const [selStat, setStat] = useState('All')

  useEffect(() => {
    axios.get('https://pre-interview.onrender.com/tiles')
      .then(res => {
        const sortedDate = res.data.sort((a, b) => new Date(b.launch_date) - new Date(a.launch_date));
        // console.log(res.data)
        setTiles(sortedDate);
      })
  }, []);

  useEffect(() => {
    axios.get('https://pre-interview.onrender.com/status')
      .then(res => {
        // console.log(res.data)
        let getStatus = res.data.map(stat => stat.status)
        // console.log(getTypes)
        setStatus(['All', ...getStatus]);
      })
  }, []);

  const filtered = selStat === 'All' ? tiles : tiles.filter(t => t.status === selStat);

  function handleOnClick(id) {
    axios.delete(`https://pre-interview.onrender.com/tiles/${id}`)
    .then(() => setTiles(newTiles => newTiles.filter(item => item.id !== id)))
  }

  return (
    <section>
    <select value={selStat} onChange={e => setStat(e.target.value)}>
      {status.map(stat => (
        <option value={stat}>{stat}</option>
      ))}
    </select>
    <ul>
      {filtered.map((t) => {
        return (
          <section>
          <h2>Tile n.{t.id}</h2>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={t.img}
                alt="background"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t.launch_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.status}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() => handleOnClick(t.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
          </section>
        )
      })}
    </ul>
  </section>
  )
}