import { AppContext } from '../context/store-context';
import { useContext } from 'react';
import { useEffect} from 'react';
import { useState} from 'react';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap-floating-label';
import Modal  from 'react-bootstrap/Modal';

const CardModal = () => {
  const {
    metaUpdate,
    showCardModal,
    setPlan,
    setProcess,
    setComplete,
    setShowCardModal,
  } = useContext(AppContext);

  const data = useContext(AppContext);
  const [validated, setValidated] = useState({ title: true, desc: true });
  const [title, setTitle] = useState('');

  const [desc, setDesc] = useState('');
  const refCategory = useRef();

  useEffect(() => {
    setValidated({ title: true, desc: true });

    if (metaUpdate) {
      for (const obj of data[metaUpdate.category]) {
        if (obj.date.toString() === metaUpdate.date) {
          setTitle(obj.title);
          setDesc(obj.desc);
          refCategory.current.value = metaUpdate.category;
        }
      }
    } else {
      setTitle('');
      setDesc('');
    }
  }, [showCardModal, metaUpdate, data]);

  const handleDelete = () => {
    switch (metaUpdate.category) {
      case 'Plan':
        setPlan((prev) => prev.filter((item) => item.date !== metaUpdate.date));
        break;
      case 'Process':
        setProcess((prev) =>
          prev.filter((item) => item.date !== metaUpdate.date)
        );
        break;
      case 'Complete':
        setComplete((prev) =>
          prev.filter((item) => item.date !== metaUpdate.date)
        );
        break;
      default:
        break;
    }
    setShowCardModal(false);
  };

  const sortDate = (arr) => {
    return arr.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z][a-zA-Z ]*$/.test(title)) {
      setValidated({ ...validated, title: false });
      return;
    }

    if (desc.length < 25) {
      setValidated({ title: true, desc: false });
      return;
    }
    setValidated({ title: true, desc: true });

    if (metaUpdate) {
      for (const i in data[metaUpdate.category]) {
        if (data[metaUpdate.category][i].date === metaUpdate.date) {
          let updatedArr = [...data[refCategory.current.value]];
          let newData = {
            title,
            desc,
            date: new Date().toLocaleString(),
            category: refCategory.current.value,
          };

          if (metaUpdate.category !== refCategory.current.value) {
            updatedArr.push(newData);

            switch (metaUpdate.category) {
              case 'Plan':
                setPlan((prev) =>
                  prev.filter((item) => item.date !== metaUpdate.date)
                );
                break;
              case 'Process':
                setProcess((prev) =>
                  prev.filter((item) => item.date !== metaUpdate.date)
                );
                break;
              case 'Complete':
                setComplete((prev) =>
                  prev.filter((item) => item.date !== metaUpdate.date)
                );
                break;
              default:
                break;
            }
          } else {
            updatedArr[i] = newData;
          }

          switch (refCategory.current.value) {
            case 'Plan':
              setPlan(sortDate(updatedArr));
              break;
            case 'Process':
              setPlan(sortDate(updatedArr));
              break;
            case 'Complete':
              setComplete(sortDate(updatedArr));
              break;
            default:
              break;
          }
        }
      }
      setShowCardModal(false);
      return;
    }

    let newCard = {
      title,
      desc,
      date: new Date().toLocaleString(),
      category: refCategory.current.value,
    };

    switch (refCategory.current.value) {
      case 'Plan':
        setPlan((prev) => [...prev].concat(newCard));
        break;
      case 'Process':
        setProcess((prev) => [...prev].concat(newCard));
        break;
      case 'Complete':
        setComplete((prev) => [...prev].concat(newCard));
        break;

      default:
        break;
    }

    setShowCardModal(false);
  };

  return (
    <>
      <Modal
        show={showCardModal}
        fullscreen='sm-down'
        onHide={() => setShowCardModal(false)}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {metaUpdate ? 'Update Card' : 'Create Card'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId='floatingInput'
              label='Title'
              className='mb-3'
            >
              <Form.Control
                type='text'
                placeholder='Task 1'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!validated.title}
              />
              <Form.Control.Feedback type='invalid'>
                Only alphabet is allowed!
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingTextarea2'
              label='Description'
              className='mb-3'
            >
              <Form.Control
                as='textarea'
                placeholder='Work on task 1'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ height: '150px' }}
                isInvalid={!validated.desc}
              />
              <Form.Control.Feedback type='invalid'>
                Minimum 25 character is essential!
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingSelect'
              label='Category'
              className='mb-3'
            >
              <Form.Select
                aria-label=''
                ref={refCategory}
              >
                <option value='Plan'>Plan</option>
                <option value='Process'>Process</option>
                <option value='Complete'>Complete</option>
              </Form.Select>
            </FloatingLabel>
            <Modal.Footer>
              <Button type='submit'>{metaUpdate ? 'Update' : 'Create'}</Button>
              {metaUpdate && (
                <Button variant='danger' onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardModal;
