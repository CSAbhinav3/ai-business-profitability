import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from joblib import dump

# Step 1: Load CSV
df = pd.read_csv("../data/1000_Companies.csv")

# Step 2: Drop non-numeric column
df.drop(columns=["State"], inplace=True)

# Step 3: Check for missing values (optional)
print("Null values:\n", df.isnull().sum())

# Step 4: Split into input and output
X = df.drop(columns=["Profit"])  # input features
y = df["Profit"]                 # target

# Step 5: Train-Test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 6: Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Step 7: Evaluate
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
print(f"Model trained. MSE: {mse:.2f}")

# Step 8: Save model
dump(model, "model/profit_model.pkl")
print("Model saved to backend/model/profit_model.pkl")
