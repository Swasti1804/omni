import os
from dotenv import load_dotenv
from omnidimension import Client

# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("OMNI_API_KEY")

# Initialize Omni client
client = Client(api_key)

# Define your public ngrok webhook URL
webhook_url = "https://3c5d-2409-40d0-203a-73d3-8d-2497-2867-275a.ngrok-free.app/webhook"

# Create the AuctionAssist voice agent
response = client.agent.create(
    name="AuctionAssist",
    welcome_message="Hello, this is AuctionAssist, your voice guide for the online auction platform. How can I assist you with auctions today?",
    context_breakdown=[
        {
            "title": "Greeting and Intent Capture",
            "body": "Welcome the caller to the AuctionAssist service. Prompt them to inquire about ongoing auctions, request product details, or place a bid."
        },
        {
            "title": "Responding to 'list_auctions' Intent",
            "body": f"If the caller asks about available products, trigger the webhook using POST to '{webhook_url}' and return the list of auctions."
        },
        {
            "title": "Handling 'get_product_info' Intent",
            "body": "When a caller asks about a product, capture 'product_name' and POST to '{webhook_url}' to retrieve product info."
        },
        {
            "title": "Processing 'place_bid' Intent",
            "body": f"Capture 'product_name' and 'bid_amount'. Then POST to '{webhook_url}' to place the bid if it is higher than current bid."
        },
        {
            "title": "Speech Style Guidelines",
            "body": "Use a professional, clear, and enthusiastic voice with helpful cues like 'Alright!' or 'Let’s check that for you.'"
        }
    ],
    transcriber={
        "provider": "deepgram_stream",
        "silence_timeout_ms": 400,
        "model": "nova-3",
        "numerals": True,
        "punctuate": True,
        "smart_format": False,
        "diarize": False
    },
    model={
        "model": "gpt-4o-mini",
        "temperature": 0.7
    },
    voice={
        "provider": "eleven_labs",
        "voice_id": "3dwJD1ugcezUHQq99S00"
    },
    post_call_actions={
        "email": {
            "enabled": True,
            "recipients": ["chaudharyswasti21@gmail.com"],
            "include": ["summary", "extracted_variables"]
        },
        "extracted_variables": [
            {
                "key": "product_name",
                "prompt": "Extract and confirm the name of the auction item the caller is interested in."
            },
            {
                "key": "bid_amount",
                "prompt": "Extract and confirm the monetary value offered by the caller."
            }
        ]
    }
)

# Print status and agent info
print(f"Status: {response['status']}")
print(f"Created Agent: {response['json']}")

# Optional: store agent ID
agent_id = response['json'].get('id')
