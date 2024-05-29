import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';

export const  PROGRESS_FIND_BY_USER_ID = gql`
  query Progress_findByUserId($userId: String!) {
    progress_findByUserId(userId: $userId) {
      id
      diet
      chest
      bodyFatPercentage
      bloodPressure
      flexibility
      leftBicep
      leftCalf
      leftShoulder
      leftForearm
      muscleMass
      restingHeartRate
      rightBicep
      rightCalf
      rightForearm
      rightShoulder
      rightLeg
      strengthLevel
      waist
      weight
      obs
      injuryHistory
      height
      fitnessGoals
      age
      dateCreated
    }
  }
`;

export interface input {
  token: string,
  _data: {userId: string, numProgress: number}
}
export const progress_find_by_user_id = async ({token, _data}: input ) => {
  try {
    console.log(_data);
    
    const query = PROGRESS_FIND_BY_USER_ID;
    const data:{progress_findByUserId: any} = await requestClient(
      query,
      {
        "userId": _data.userId
      },
      token
    );
    const data2 = [
      {
        "weight": "80",
        "rightShoulder": "45",
        "leftShoulder": "44",
        "rightBicep": "35",
        "leftBicep": "34",
        "rightLeg": "50",
        "leftLeg": "49",
        "chest": "89",
        "rightCalf": "35",
        "leftCalf": "34",
        "waist": "82",
        "rightForearm": "30",
        "leftForearm": "29",
        "diet": "Balanced diet, high protein",
        "height": "180",
        "age": "28",
        "bodyFatPercentage": "15",
        "muscleMass": "60",
        "restingHeartRate": "60",
        "bloodPressure": "120/80",
        "endurance": "High",
        "flexibility": "Moderate",
        "strengthLevel": "Advanced",
        "injuryHistory": "None",
        "fitnessGoals": "Increase muscle mass"
      },
      {
        "weight": "80",
        "rightShoulder": "45",
        "leftShoulder": "44",
        "rightBicep": "35",
        "leftBicep": "34",
        "rightLeg": "50",
        "leftLeg": "49",
        "chest": "89",
        "rightCalf": "35",
        "leftCalf": "34",
        "waist": "82",
        "rightForearm": "30",
        "leftForearm": "29",
        "diet": "Balanced diet, high protein",
        "height": "180",
        "age": "28",
        "bodyFatPercentage": "15",
        "muscleMass": "60",
        "restingHeartRate": "60",
        "bloodPressure": "120/80",
        "endurance": "High",
        "flexibility": "Moderate",
        "strengthLevel": "Advanced",
        "injuryHistory": "None",
        "fitnessGoals": "Increase muscle mass"
      },
    ]
    return data.progress_findByUserId;
  // return [];
  // return data2
  } catch (error:any) {
    console.log('progress_find_by_id', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}