import { useState, useEffect } from 'react';
import axios from 'axios';

import Carousel from 'react-material-ui-carousel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [types, setTypes] = useState([]);
  const [selType, setType] = useState('All')

  useEffect(() => {
    axios.get('https://pre-interview.onrender.com/tasks')
      .then(res => {
        // console.log(res.data)
        const sortedOrder = res.data.sort((a, b) => a.order - b.order);
        setTasks(sortedOrder)
      })
  }, []);

  useEffect(() => {
    axios.get('https://pre-interview.onrender.com/types')
      .then(res => {
        // console.log(res.data)
        let getTypes = res.data.map(type => type.type)
        // console.log(getTypes)
        setTypes(['All', ...getTypes]);
      })
  }, []);

  const filteredTasks = selType === 'All' ? tasks : tasks.filter(task => task.type === selType);

  function handleOnClick(id) {
    axios.delete(`https://pre-interview.onrender.com/tasks/${id}`)
      .then(() => setTasks(newTasks => newTasks.filter(item => item.id !== id)))
  }

  return (
    <section>
      <select value={selType} onChange={e => setType(e.target.value)}>
        {types.map(type => (
          <option value={type}>{type}</option>
        ))}
      </select>
      <Carousel NavButton={({onClick, style, next, prev}) => {
        return (
          <Button onClick={onClick} className="navigation" style={style}>
            {next && "next"}
            {prev && "previous"}
          </Button>
        )
      }}
      >
        {filteredTasks.map((t) => {
          return (
            <section className="task-card">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {t.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleOnClick(t.id)}>
                  Delete
                </Button>
                <Button size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
            </Card>
            </section>
          )
        })}
      </Carousel>
    </section>
  )
}
