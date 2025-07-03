import React from 'react';

function DateHeader({ selectedDate, onDateChange, onNavigateDate }) {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    onNavigateDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    onNavigateDate(nextDay);
  };

  const goToToday = () => {
    onNavigateDate(new Date());
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex flex-col gap-4">
          {/* Main Date Display */}
          <div className="flex items-center justify-between">
            <button 
              onClick={goToPreviousDay}
              className="btn btn-secondary"
              style={{ padding: '0.75rem', minWidth: '3rem' }}
            >
              ←
            </button>
            
            <div className="text-center flex-1">
              <div className="text-3xl font-bold text-primary mb-1">
                📅 {formatDate(selectedDate)}
              </div>
              {isToday(selectedDate) && (
                <span className="badge badge-primary">
                  Today
                </span>
              )}
            </div>
            
            <button 
              onClick={goToNextDay}
              className="btn btn-secondary"
              style={{ padding: '0.75rem', minWidth: '3rem' }}
            >
              →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-center gap-4">
            {!isToday(selectedDate) && (
              <button 
                onClick={goToToday}
                className="btn btn-sm btn-primary"
              >
                🏠 Go to Today
              </button>
            )}
            
            <input
              type="date"
              className="form-input"
              style={{ width: 'auto' }}
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => onDateChange(new Date(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateHeader;
