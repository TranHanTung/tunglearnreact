import { useState,useEffect } from 'react';
import { Table } from '../elements/Table';
import { uuid } from '../../utils'
import './style.scss';
/*
 - để hiện thị được các dữ liệu tìm kiếm mà k làm ảnh hưởng đến mảng ban đầu
 ta cần tạo một mảng mới, để lưu trữ gti tìm kiếm và hiển thị thay cho dữ liệu ban đầu
 -nếu k tìm kiếm => hiển thị mảng ban dầudầu
*/


  const data = [
    {
    name: 'Quét nhà',
    des: 'Rửa bát,quét sạch',
    status: 'C',
    id: uuid()
    },
    {
      name: 'Nấu cơm',
      des: 'Rửa bát,quét sạch',
      status: 'C',
      id: uuid()
    },
    {
      name: 'Chơi game',
      des: 'Rửa bát,quét sạch',
      status: 'C',
      id: uuid()
    }
  ]

  
  let isUpdate = false;
  const Todolist = () => {
    const [todos, setTodos] = useState(data);
    const[error, setError]= useState(false);
    const[filterTodo, setFilterTodo] = useState([]);
    const[filterValue, setFilterValue]= useState('');

    const [newTodo, setNewTodo]=useState({
      name: '',
      id: uuid(),
      des: '',
      status: ''
    });
  useEffect(() => {
    if (newTodo.name.length <= 6 && newTodo.name) {
      setError(true);
      
    }else{
      setError(false);
    }
  }, [newTodo])
  useEffect(() => {
    if (filterValue) {
      setFilterTodo(todos.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase())))
  } else {
    setFilterTodo([]);
  }

  }, [filterValue])

    const addTodo = () => {
      if(newTodo.name === '' || newTodo.des === '') {
        alert('Bạn chưa nhâp đày đủ thông tin');
      } else {
          if(!isUpdate) {
              setTodos([...todos, newTodo])
          } else {
              let idxCrrTodo = todos.findIndex(todo => todo.id === newTodo.id);
              todos.splice(idxCrrTodo, 1,newTodo);
              setTodos([...todos]);
      
          }
          setNewTodo({
            name: '',
            des: '',
            id: uuid(),
            status: 'P'    
          }) 
      }
      
    }
    const deleteTodo = (id) => {
      setTodos(todos.filter(item => item.id !== id))
    }
    const handleChangeTodo = (e) => {
      newTodo[e.target.name] = e.target.value;
      setNewTodo({ ...newTodo });
      
    }
  return (
    <div className="container-todo-list">
        <h1>Todo Application</h1>
        <div className="header-fnc-create-todo">
            <input type="text" className="title" placeholder="Type title" name="name" value={newTodo.name} onChange={handleChangeTodo}/>
            {error && <p className="error-text" style={{color: 'red'}}>Teeen cần lớn hơn 6 kí tự</p>}
            <input type="text" className="description" placeholder="Type description" name="des" value={newTodo.des} onChange={handleChangeTodo}/>
            <button className="create" onClick = {() => { addTodo ()}}>Create Todo</button>
            <select name="status" id="" value={newTodo.status} onChange={(e) => {
              setNewTodo({ ...newTodo, status: e.target.value })
            }}>
              <option value={'C'}>Completed</option>
              <option value={'P'}>Pending</option>
            </select>
            <br />
            <br />
            <input type="text" className="title" placeholder="Type to search" name="filter" value={filterValue} 
            onChange={(e) => { setFilterValue(e.target.value) }}/>

        </div>
        <div className="fnc-mask-clear">
            <button className="clear-btn">Clear Todo</button>
            <button className="mask-btn">Mask as Completed</button>
        </div>
        <Table data = {filterTodo.length !== 0 ? filterTodo : todos} onClickEdit={(crrTodo) => { 
            isUpdate= true;
            setNewTodo(crrTodo) 
        }} handleDeleteTodo={deleteTodo}/>
    </div>
  )
};
export default Todolist;
