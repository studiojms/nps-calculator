import { Request, Response } from 'express';
import { getCustomRepository, IsNull, Not } from 'typeorm';
import SurveyUserRepository from '../repositories/SurveyUserRepository';

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUsers = await surveyUserRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractors = surveyUsers.filter((surveyUser) => surveyUser.value >= 0 && surveyUser.value < 7);
    const promoters = surveyUsers.filter((surveyUser) => surveyUser.value >= 9 && surveyUser.value <= 10);
    const passives = surveyUsers.filter((surveyUser) => surveyUser.value >= 7 && surveyUser.value < 9);

    const totalAnswers = surveyUsers.length;
    const nps = ((promoters.length - detractors.length) / totalAnswers) * 100;

    return response.json({
      detractors: detractors.length,
      promoters: promoters.length,
      passives: passives.length,
      totalAnswers,
      nps: nps.toFixed(2),
    });
  }
}

export default NpsController;
