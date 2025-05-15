
# 🍽️ Restaurant Review Summarization API

This FastAPI application summarizes user reviews for a restaurant using a pretrained NLP model. It provides an overview of positive and negative feedback, along with the average rating.

---

## 🚀 Features

- Accepts a list of restaurant reviews (with ratings and comments).
- Calculates the average rating.
- Separates and summarizes positive and negative reviews.
- Provides a concise overview of restaurant feedback.
- Swagger UI documentation.

---

## 🧪 Example Request

```json
POST /summarize_reviews

{
  "reviews": [
    {
      "id": 1,
      "customerId": 101,
      "restaurantId": 16,
      "rating": 5,
      "comment": "I had an absolutely delightful experience at this restaurant. From the moment we walked in, the staff was incredibly friendly and attentive. The atmosphere was warm and inviting, with elegant decor and soft lighting that made our dinner feel very special. I ordered the grilled salmon, which was cooked to perfection and paired wonderfully with the roasted vegetables. My partner had the filet mignon and was equally impressed with the tenderness and flavor. We finished the meal with a rich chocolate lava cake that was heavenly. Overall, I couldn't have asked for a better dining experience and will definitely be returning soon.",
      "reviewDate": "2025-05-12T15:50:34.498"
    },
    {
      "id": 2,
      "customerId": 102,
      "restaurantId": 16,
      "rating": 4,
      "comment": "The food was fantastic and the portion sizes were generous. I especially enjoyed the creamy mushroom risotto, which was bursting with flavor and had the perfect texture. The wait time was a bit longer than expected, but the quality of the food made up for it. Service was polite and helpful, although it would have been nice if the server checked in on us more frequently. Still, a solid experience overall and I would recommend this place to friends and family.",
      "reviewDate": "2025-05-12T16:40:12.210"
    },
    {
      "id": 3,
      "customerId": 103,
      "restaurantId": 16,
      "rating": 2,
      "comment": "Unfortunately, my visit to this restaurant did not meet my expectations. Despite the appealing menu, the dishes were disappointing. I ordered the pasta with seafood, but it was extremely salty and the shrimp were overcooked. The bread served at the beginning was stale, and the service was quite slow. We had to wait nearly 40 minutes for our food, and during that time, no one checked on us or offered refills for our drinks. It felt like the staff was overwhelmed or understaffed. The ambiance was okay, but the poor service and subpar food left a bad taste in my mouth.",
      "reviewDate": "2025-05-12T17:15:28.990"
    },
    {
      "id": 4,
      "customerId": 104,
      "restaurantId": 16,
      "rating": 3,
      "comment": "Mixed feelings about this restaurant. The starters were good — especially the bruschetta and calamari — but the main course was average at best. I had the chicken parmesan, which was dry and lacked seasoning. My friend had the burger, which looked better than it tasted. The service was decent, and the decor was nice, but nothing really stood out. It's not bad, but I wouldn’t go out of my way to return either. It seems like a place that could be much better with just a bit more attention to detail.",
      "reviewDate": "2025-05-12T17:29:55.594"
    }
  ]
}
````

### 🔁 Example Response

```json
{
  "average_rating": 3.5,
  "positive_overview": "The food was fantastic and the portion sizes were generous. The wait time was a bit longer than expected, but the quality of the food made up for it. Service was polite and helpful, although it would have been nice if the server checked in on us more frequently.",
  "negative_overview": "Despite the appealing menu, the dishes were disappointing. I ordered the pasta with seafood, but it was extremely salty and the shrimp were overcooked. The service was decent, and the decor was nice, but nothing really stood out. It seems like a place that could be much better with just a bit more attention to detail."
}
```

---

## 📦 Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/Mohamed-0-Turki/restaurant-review-summarizer.git
cd restaurant-review-summarizer

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate

# 3. Install required packages
pip install fastapi uvicorn transformers torch

# 4. Run the server
uvicorn main:app --reload
```

---

## 📘 API Docs

Once the server is running:

* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🛠️ Notes

* The model used is `facebook/bart-large-cnn` via Hugging Face Transformers.
* First-time model loading may take some time and disk space (\~1.5–2 GB).

---

## 📄 License

This project is open-source and free to use under the MIT License.