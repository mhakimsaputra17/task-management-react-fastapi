import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import tasks
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("todolist-api")

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TodoList API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware to log requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    # Get client IP and requested path
    client_host = request.client.host if request.client else "unknown"
    path = request.url.path
    method = request.method
    
    logger.info(f"Request started: {method} {path} from {client_host}")
    
    response = await call_next(request)
    
    # Calculate request processing time
    process_time = time.time() - start_time
    formatted_process_time = "{:.2f}ms".format(process_time * 1000)
    
    logger.info(f"Request completed: {method} {path} - Status: {response.status_code} - Time: {formatted_process_time}")
    
    return response

# Include routers
app.include_router(tasks.router)

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to TodoList API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
