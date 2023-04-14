import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddTask() {
    const [title, setTitle] = useState('')
    const [img_url, setImgURL] = useState('')
    const [desc, setDesc] = useState('')
    const [types, setTypes] = useState([])
    const [selType, setType] = useState('')
    const [ord, setOrder] = useState()
    const [tile, setTile] = useState()
    const [tiles, setTiles] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get('https://pre-interview.onrender.com/tasks')
            .then(res => {
                // console.log(res.data)
                const sortedOrder = res.data.sort((a, b) => a.order - b.order);
                setTasks(sortedOrder)
            })
    }, []);


    const handleSubmit = e => {
        let body = { title: title, img_url: img_url, order: ord, description: desc, type: selType, tile: tile };
        e.preventDefault();
        console.log(body)
        setTitle('');
        setImgURL('');
        setDesc('');
        setType('');
        setOrder('');
        setTile()
        setTasks([body, ...tasks])
        axios.post('https://pre-interview.onrender.com/tasks', body)
            .catch(err => {
                console.log(err)
                setTasks(currTasks => {
                    currTasks.splice(0, 1)
                    return [...currTasks]
                })
            })
    }

    useEffect(() => {
        axios.get('https://pre-interview.onrender.com/types')
            .then(res => {
                let getTypes = res.data.map(t => t.type)
                setTypes([...getTypes]);
            })
    }, []);

    useEffect(() => {
        axios.get('https://pre-interview.onrender.com/tiles')
            .then(res => {
                const sortedDate = res.data.sort((a, b) => new Date(b.launch_date) - new Date(a.launch_date));
                const t = sortedDate.map(t => t.id)
                // console.log(res.data)
                setTiles([...t]);
            })
    }, []);


    return (
        <form onSubmit={handleSubmit}>
            <label> Title:
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <br />
            <label> img_url:
                <input type='text' value={img_url} onChange={e => setImgURL(e.target.value)} />
            </label>
            <br />
            <label> Order:
                <input type='number' value={ord} onChange={e => setOrder(e.target.value)} />
            </label>
            <br />
            <label> Description:
                <input type='text' value={desc} onChange={e => setDesc(e.target.value)} />
            </label>
            <br />
            <label className='dropdown'> Type:
                <select name="types" onChange={e => setType(e.target.value)}>
                    <option value={selType}>Select type</option>
                    {types.map(t => (
                        <option value={t}>{t}</option>
                    ))}
                </select>
            </label>
            <label className='dropdown'> Tile:
                <select name='tile' onChange={e => setTile(e.target.value)}>
                    <option value={tile}>Select tile</option>
                    {tiles.map(t => (
                        <option value={t}>{t}</option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">Add Task</button>
        </form>
    )
}