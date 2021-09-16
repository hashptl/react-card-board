import { AppContext } from '../context/store-context';
import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

const Cards = ({ title, desc, category, date }) => {
  const { setMetaUpdate, setShowCardModal } = useContext(AppContext);

  const handleCardClick = (e) => {
    setMetaUpdate({
      date: e.currentTarget.dataset.date,
      category: e.currentTarget.dataset.category,
    });
    setShowCardModal(true);
  };

  return (
    <>
      <Card
        style={{ margin: '10px 0px' }}
        data-category={category}
        data-date={date}
        onClick={handleCardClick}
      >
        <Button variant='light'>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{desc}</Card.Text>
          </Card.Body>
        </Button>
      </Card>
    </>
  );
};

export default Cards;
