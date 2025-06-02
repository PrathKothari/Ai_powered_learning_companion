from pymongo import MongoClient
from bson import ObjectId
from pprint import pprint

def extract_user_data(user_id):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['userDB']
    users_collection = db['users']

    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"error": "User not found"}

    previously_diagnosed = user.get("Previously Diagnosed", "No").strip().lower()

    # Extract 0-9 fields regardless
    zero_to_nine_data = {str(i): user.get(str(i)) for i in range(10)}

    # Case: User was previously diagnosed
    if previously_diagnosed == "yes":
        diagnosis_data = {
            "age_at_diagnosis": user.get("Age at diagnosis"),
            "adhd_type": user.get("Which type of ADHD?"),
            "who_diagnosed": user.get("Who diagnosed"),
            "diagnosis_methods": user.get("Diagnosis methods", [])
        }

        # Case: type of ADHD not known or not specified
        if diagnosis_data["adhd_type"].strip().lower() in ["no", "no type", "no idea", "none"]:
            academicImpact = user.get("academicImpact")
            socialImpact = user.get("socialImpact")
            taskImpact = user.get("taskImpact")
            timeMgmt = user.get("timeMgmt")
            distractions = user.get("distractions")
            planning = user.get("planning")
            moodSwings = user.get("moodSwings")
            exhaustion = user.get("exhaustion")
            hyperfocus = user.get("hyperfocus")
            timeMgmtAgain = user.get("timeMgmtAgain")
            typeA = user.get("typeA", [])

            page4_data = {
                "academicImpact": academicImpact,
                "socialImpact": socialImpact,
                "taskImpact": taskImpact,
                "timeMgmt": timeMgmt,
                "distractions": distractions,
                "planning": planning,
                "moodSwings": moodSwings,
                "exhaustion": exhaustion,
                "hyperfocus": hyperfocus,
                "timeMgmtAgain": timeMgmtAgain,
                "typeA": typeA
            }

            return {
                "status": "diagnosed_no_type",
                "diagnosis_data": diagnosis_data,
                "page4_data": page4_data
            }

        return {
            "status": "diagnosed",
            "diagnosis_data": diagnosis_data
        }

    # Case: User not previously diagnosed
    academicImpact = user.get("academicImpact")
    socialImpact = user.get("socialImpact")
    taskImpact = user.get("taskImpact")
    timeMgmt = user.get("timeMgmt")
    distractions = user.get("distractions")
    planning = user.get("planning")
    moodSwings = user.get("moodSwings")
    exhaustion = user.get("exhaustion")
    hyperfocus = user.get("hyperfocus")
    typeA = user.get("typeA", [])

    page3_and_4_data = {
        "academicImpact": academicImpact,
        "socialImpact": socialImpact,
        "taskImpact": taskImpact,
        "timeMgmt": timeMgmt,
        "distractions": distractions,
        "planning": planning,
        "moodSwings": moodSwings,
        "exhaustion": exhaustion,
        "hyperfocus": hyperfocus,
        "timeMgmtAgain": timeMgmtAgain,
        "typeA": typeA
    }

    return {
        "status": "not_diagnosed",
        "data": page3_and_4_data,
        "zero_to_nine": zero_to_nine_data
    }

if __name__ == "__main__":
    user_id = "681bb3fa3451eb56340dc685"  # Replace with actual ObjectId as string
    pprint(extract_user_data(user_id))
