import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const AdminSerialCard = ({ item }) => {
  const { title, poster, routeName } = item;
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia component='img' height='180' image={poster} alt='item' />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            className='title-overflow'>
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>
            <Link to={`/admin/serials/${routeName}`}>Edit</Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default withRouter(AdminSerialCard);
