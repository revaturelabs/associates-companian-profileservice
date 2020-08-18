import { Profile } from "../../models/Profile";
import { PoolClient} from "pg";
import { connectionPool } from ".";
//import { logger, errorLogger } from "../../utils/logger";


export async function UpdateProfile(updatedProfile:Profile):Promise<Profile>{
    let client : PoolClient
    try{
        client = await connectionPool.connect()
        await client.query('BEGIN;') //begins the transaction
    //left off the userId aspect of it for now, not sure how that is going to work
        if(updatedProfile.nickname){
            await client.query(`update ${schema}.profile set nickname = $1`, [updatedProfile.nickname]) 
        }
        if(updatedProfile.pronouns){
            await client.query(`update ${schema}.profile set pronouns = $1`, [updatedProfile.pronouns])
        }
        if(updatedProfile.hobbies){
            await client.query(`update ${schema}.profile set hobbies = $1`, [updatedProfile.hobbies])
        }
        if(updatedProfile.favFoods){
            await client.query(`update ${schema}.profile set favFoods = $1`, [updatedProfile.favFoods])
        }
        if(updatedProfile.specialTrait){
            await client.query(`update ${schema}.profile set specialTrait = $1`, [updatedProfile.specialTrait])
        }
        if(updatedProfile.degree){
            await client.query(`update ${schema}.profile set degree = $1`, [updatedProfile.degree])
        }
        if(updatedProfile.favLangauge){
            await client.query(`update ${schema}.profile set favLangauge = $1`, [updatedProfile.favLangauge])
        }
        if(updatedProfile.relevantSkills){
            await client.query(`update ${schema}.profile set relevantSkills = $1`, [updatedProfile.relevantSkills])
        }
        if(updatedProfile.introvert){
            await client.query(`update ${schema}.profile set introvert = $1`, [updatedProfile.introvert])
        }
        if(updatedProfile.studyGroup){
            await client.query(`update ${schema}.profile set studyGroup = $1`, [updatedProfile.studyGroup])
        }
        await client.query('COMMIT;') //ends the transaction
        //below is just a placeholder, will edit when get profile is done 
        return getProfile(updatedProfile.auth0Id)
    } catch (error) {
        client && client.query('ROLLBACK;') //does not save if doesn't work
        //placeholder until similar error is figured out
        if(error.message === 'Role not found'){
            throw new Error('Role not found')
        }
        //logger.error(error);
        //errorLogger.error(error)
        throw new Error ('Unhandled Error')
    }finally{
        client && client.release();
    }
}