import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyUserRepository from '../repositories/SurveyUserRepository';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      return response.status(400).json({
        error: "Survey User doesn't exist",
      });
    }

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export default AnswerController;
