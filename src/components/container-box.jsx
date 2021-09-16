import Cards from './cards';
import { AppContext } from '../context/store-context';
import { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ContainerBox = ({ title }) => {
  const { dragging, setPlan, setProcess, setComplete, ...data } =
    useContext(AppContext);

  const replaceCard = (newCategory, draggedEl) => {
    let updatedArr = [...data[newCategory]];
    let oldArr = data[draggedEl.dataset.category].filter(
      (item) => item.date !== draggedEl.dataset.date
    );

    let cardData = data[draggedEl.dataset.category].find((obj) => {
      return obj.date === draggedEl.dataset.date;
    });

    cardData.date = new Date().toString();
    cardData.category = newCategory;
    updatedArr.push(cardData);

    switch (draggedEl.dataset.category) {
      case 'Plan':
        setPlan(oldArr);
        break;
      case 'Process':
        setProcess(oldArr);
        break;
      case 'Complete':
        setComplete(oldArr);
        break;
      default:
        break;
    }

    switch (newCategory) {
      case 'Plan':
        setPlan(updatedArr);
        break;
      case 'Process':
        setProcess(updatedArr);
        break;
      case 'Complete':
        setComplete(updatedArr);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Card style={{ marginBottom: '30px' }}>
        <Card.Header>
          <strong style={{ color: 'darkblue' }}>{title}</strong>
        </Card.Header>
        <Card.Body
          data-title={title}
          data-draggable={true}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (
              e.currentTarget.dataset.title !==
              dragging.current.dataset.category
            ) {
              replaceCard(e.currentTarget.dataset.title, dragging.current);
            }
          }}
        >
          <Container>
            <Row>
              {data[title].length === 0
                ? 'Empty'
                : data[title].map(({ title, desc, date, category }) => (
                    <Col
                      xs={12}
                      key={date}
                      data-category={category}
                      data-date={date}
                      draggable={true}
                      onDragStart={(e) => {
                        dragging.current = e.target;
                      }}
                      onDragEnd={() => {
                        dragging.current = null;
                      }}
                    >
                      <Cards
                        title={title}
                        desc={desc}
                        category={category}
                        date={date}
                      />
                    </Col>
                  ))}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default ContainerBox;
