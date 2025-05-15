from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

# Initialize summarizer
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

app = FastAPI()

# Allow requests from your frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend's URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Review(BaseModel):
    id: int
    customerId: int
    restaurantId: int
    rating: int
    comment: str
    reviewDate: str

class ReviewSummary(BaseModel):
    average_rating: float
    positive_overview: str
    negative_overview: str

class ReviewsRequest(BaseModel):
    reviews: List[Review]

@app.post("/restaurant_summary", response_model=ReviewSummary)
def restaurant_summary(request: ReviewsRequest):
    total_rating = 0
    positive_comments = []
    negative_comments = []

    for review in request.reviews:
        total_rating += review.rating
        if review.rating >= 4:
            positive_comments.append(review.comment)
        elif review.rating <= 3:
            negative_comments.append(review.comment)

    avg_rating = round(total_rating / len(request.reviews), 2) if request.reviews else 0

    def summarize_comments(comments: List[str]) -> str:
        text = " ".join(comments)
        if len(text.split()) > 10:
            summary = summarizer(text, max_length=150, min_length=50, do_sample=False)
            return summary[0]['summary_text']
        return text or "No comments available."

    return {
        "average_rating": avg_rating,
        "positive_overview": summarize_comments(positive_comments),
        "negative_overview": summarize_comments(negative_comments)
    }
