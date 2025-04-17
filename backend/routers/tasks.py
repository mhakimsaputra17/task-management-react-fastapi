from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
)

@router.get("/", response_model=List[schemas.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(models.Task).all()
    return tasks

@router.post("/", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_data: schemas.TaskUpdate, db: Session = Depends(get_db)):
    task_query = db.query(models.Task).filter(models.Task.id == task_id)
    task = task_query.first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
        
    task_query.update(task_data.dict(), synchronize_session=False)
    db.commit()
    db.refresh(task)
    return task

@router.patch("/{task_id}/toggle", response_model=schemas.TaskResponse)
def toggle_task(task_id: int, task_toggle: schemas.TaskToggle, db: Session = Depends(get_db)):
    task_query = db.query(models.Task).filter(models.Task.id == task_id)
    task = task_query.first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
        
    task_query.update({"completed": task_toggle.completed}, synchronize_session=False)
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return None
