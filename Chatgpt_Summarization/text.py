import json
from summary import get_summary
import time



def get_college():
    f = open('columns.json')
    text = json.load(f)
    college_names = []
    for college in text:
        college_names.append(college)
    return college_names


def get_rating():
    f = open('rating.json')
    text = json.load(f)
    ratings = []
    for college in text:
        ratings.append(college)
    return ratings

def get_combined_reviews():
    f = open('reviews.json')
    text = json.load(f)
    combined_reviews = []
    for overview in text['review']:
        text = ' '
        for review in overview:
            text += review
        combined_reviews.append(text)
    return combined_reviews


def get_summarized_reviews(combined_reviews):
    summarized_reviews = {}
    colleges = get_college()
    ratings = get_rating()
    for i in range(2859,len(combined_reviews)):
        time.sleep(3)
        print(f"On review : {i}")
        try:
            summary = get_summary(combined_reviews[i])
        except:
            continue
        college = colleges[i]
        rating = ratings[i]
        print("college :" + college +", Summary :")
        print(summary)
        print(f" Rating : {rating}")
        summarized_reviews[f'{college}'] = summary
        summarized_reviews[f'{college}']['rating'] = rating
        # rat = {'Rating' : rating}
        with open("summary.json") as f:
            f_data = json.load(f)
        new_data = f_data
        # print(f_data)
        new_data.update({
            f"{college}": summarized_reviews[f'{college}']
        })
        # print(new_data)
        with open("summary.json", 'w') as json_file:
            json.dump(new_data, json_file,
                      indent=4)
    return summarized_reviews

if __name__ == '__main__':
    combined_reviews = get_combined_reviews()
    print(len(combined_reviews))
    summarized_reviews = get_summarized_reviews(combined_reviews)
    # print(len(summarized_reviews))
    with open("summaries.json", "w") as f:
        f.write(json.dumps(summarized_reviews))

    
