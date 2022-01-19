import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const AdminData = () => {
  return (
    <div className='container'>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component='img'
          height='200'
          image='https://static3.cbrimages.com/wordpress/wp-content/uploads/2021/08/venom-2-header-2.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5'
          alt='movies'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            movies
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>
            <Link to='/admin/movies'>Movie List</Link>
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ width: 345 }}>
        <CardMedia
          component='img'
          height='200'
          image='https://www.uptvs.com/wp-contents/uploads/2021/09/Money.Heist-S5-Trailer.jpg'
          alt='serials'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            serials
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>
            <Link to='/admin/serials/'>Serial List</Link>
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ width: 345 }}>
        <CardMedia
          component='img'
          height='200'
          image='https://m.media-amazon.com/images/I/71WTJFsOExL._AC_SX679_.jpg'
          alt='animes'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            animes
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>
            <Link to='/admin/animes/'>Serial List</Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AdminData;
