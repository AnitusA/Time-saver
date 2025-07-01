import React, { useState } from 'react';

function TodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo, timeSlot, selectedDate }) {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo({
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        timeSlot: timeSlot,
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
      setNewTodo('');
    }
  };

  const formatTime12Hour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      border: '2px solid rgba(102, 126, 234, 0.2)'
    }}>
      <h4 style={{ 
        marginBottom: '15px', 
        color: '#333', 
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        ✅ Todo List for {formatTime12Hour(timeSlot)}
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {todos.length} total
          </span>
          {todos.filter(t => t.completed).length > 0 && (
            <span style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              ✓ {todos.filter(t => t.completed).length} done
            </span>
          )}
          {todos.filter(t => !t.completed).length > 0 && (
            <span style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              ⏳ {todos.filter(t => !t.completed).length} pending
            </span>
          )}
        </div>
      </h4>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo item..."
            style={{
              flex: 1,
              padding: '10px 15px',
              border: '2px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'white',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.border = '2px solid #667eea';
              e.target.style.boxShadow = '0 0 15px rgba(102, 126, 234, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.border = '2px solid rgba(102, 126, 234, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(67, 233, 123, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(67, 233, 123, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(67, 233, 123, 0.3)';
            }}
          >
            ➕ Add
          </button>
        </div>
      </form>

      {/* Todo Items */}
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {todos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#999',
            fontStyle: 'italic',
            padding: '20px'
          }}>
            No todo items yet. Add one above!
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                marginBottom: '8px',
                background: todo.completed ? 
                  'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)' : 
                  'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderRadius: '8px',
                border: `2px solid ${todo.completed ? '#4caf50' : '#dee2e6'}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateX(5px)';
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateX(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '4px',
                  border: `2px solid ${todo.completed ? '#4caf50' : '#ccc'}`,
                  background: todo.completed ? '#4caf50' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => onToggleTodo(todo.id)}
              >
                {todo.completed && '✓'}
              </div>
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#666' : '#333',
                  fontSize: '14px'
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTodo(todo.id);
                }}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
