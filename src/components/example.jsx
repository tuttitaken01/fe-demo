import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

export default function Example(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel
        NavButton={({onClick, className, style, next, prev}) => {
            // Other logic
    
            return (
                <Button onClick={onClick} className={className} style={style}>
                    {next && "Next"}
                    {prev && "Previous"}
                </Button>
            )
        }}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}