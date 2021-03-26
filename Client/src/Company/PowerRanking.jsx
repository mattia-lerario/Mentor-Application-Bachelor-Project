import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field,ErrorMessage } from 'formik';
import { companyService, alertService } from '@/_services';
import { PRform } from '../style/styledcomponents';

function PowerRanking({...match}) {
    const { id } = match.params;
    const isAddMode = !id;

    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setCompanies(x));
    }, []);

    const initialValues = {
        question1: 0,
        comment1: ' Write comment here',
        question2: 0,
        comment2: ' Write Comment here',
        question3: 0,
        comment3: ' Write Comment here',
        question4: 0,
        comment4: ' Write Comment here',
        question5: 0,
        comment5: ' Write Comment here',
        question6: 0,
        comment6: ' Write Comment here',
        question7: 0,
        comment7: ' Write Comment here',
        question8: 0,
        comment8: ' Write Comment here',
        question9: 0,
        comment9: ' Write Comment here',
        question10: 0,
        comment10: ' Write Comment here',
        question11: 0,
        comment11: ' Write Comment here',
        date: Date.now,
    };

   /*const validationSchema = Yup.object().shape({

    question1: Yup.number()
            .required('Questions must be answered with a value from 1 to 6')
            .positive('It must be a positive number')
            .min(1, "You must have minimum 1")
            ,
    quarter: Yup.number()
            .required('You Must select the Quarter of the Year this is for.')
            .positive('It must be a positive number')
            .min(1,"Minimum is 1")
            .max(4,"Maximum is 4"),
    date: Yup.date()
            .required('Date is required')
            .max(new Date())
    
    });*/

    function onSubmit(fields, {setSubmitting }) {
        console.log(fields.companyId);
        companyService.createPowerRanking(fields.companyId, fields)    
        .then(() => {
            alertService.success('Update successful', { keepAfterRouteChange: true });
            history.push('.');
        })
        .catch(error => {
            console.log(error);
            setSubmitting(false);
            alertService.error(error);
        }); 
    }    
        
    return (
        <Formik initialValues={initialValues} /*validationSchema={validationSchema}*/ onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        console.log(id);
                        companyService.getById(id).then(company => {
                            const fields = ['companyId','question1', 'comment1','question2', 'comment2','question3', 'comment3','question4', 'comment4','question5', 'comment5','question6', 'comment6','question7', 'comment7','question8', 'comment8','question9', 'comment9', 'question10', 'comment10','question11', 'comment11','date'];
                            fields.forEach(field => setFieldValue(field, company[field], false));
                        });
                    }
                }, []);

                return (
                        <PRform>

                            <section className="Choose">
                                <label>Choose Company to examine</label>
                                <Field name="companyId" as="select" className={'FormGroups' + (errors.companyId && touched.companyId ? ' is-invalid' : '')}>
                                <option key="blank" value=" "></option>
                                {companies && companies.map(company =>
                                <option key={company.id} value ={company.id}>{company.companyName}</option>)}
                                </Field>
                                <ErrorMessage name="companyId" component="div" className="InvalidFeedback" />
                            </section>
                       
                            <section className="QuestionBox">
                                <div className="Question">
                                    <label>
                                        Do the team have the necessary drive and execution power to reach the company goals.
                                        Formal background to execute key tasks, complementary CV (tech and business), ability to take feedback from mentors and  
                                        an overall underatsing of the challenges should be taken into account in building a great company
                                    </label>
                                </div>
                                <div className="Ranking">
                                    <p>Ranking: </p>
                                    <Field name="question1" type="number" className={'RankingField' + (errors.question1 && touched.question1 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="question1" component="div" className="InvalidFeedback" />
                                </div>
                                <div className="Comment">
                                    <label>Comment:</label>
                                    <Field name="comment1" type="textarea" className={'CommentField' + (errors.comment1 && touched.comment1 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="comment1" component="div" className="InvalidFeedback" />
                                </div>
                            </section>
                         
                            <section className="QuestionBox">
                                <div className="Question">
                                    <label> Is the positioning of the proiduct offering good enough to make a difference in the market?
                                        Do the offering have the needed competitive edge?
                                        Is the offering scalable?
                                        How unique is the offering compared to others in the market?
                                    </label>
                                </div>
                                <div className="Ranking">
                                    <p>Ranking: </p>
                                    <Field name="question2" type="number" className={'RankingField' + (errors.question2 && touched.question2 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="companyId" component="div" className="InvalidFeedback" />
                                </div>
                                <div className="Comment">
                                    <label>Comment:</label>
                                    <Field name="comment2" type="textarea" className={'CommentField' + (errors.comment2 && touched.comment2 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="comment2" component="div" className="InvalidFeedback" />
                                 </div>
                            </section>
                         
                            <section className="QuestionBox">
                                <div className="Question">
                                    <label>
                                        Is the target market large enough?
                                        Is there attractive follow on market? 
                                        Is it possible for the company to grow outside the Nordics? 
                                    </label>
                                </div>
                                <div className="Ranking">
                                    <p>Ranking: </p>
                                    <Field name="question3" type="number" className={'RankingField' + (errors.question3 && touched.question3 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="question3" component="div" className="InvalidFeedback" />
                                </div>
                                <div className="Comment">
                                    <label>Comment:</label>
                                    <Field name="comment3" type="textarea" className={'CommentField' + (errors.comment3 && touched.comment3 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="comment3" component="div" className="InvalidFeedback" />
                                </div>
                            </section>
                         
                         <section className="QuestionBox">
                            <div className="Question">
                                <label>
                                    Is the company on track to deliver on its milestones?
                                    Do the company as a whole have the necessary drive and traction traction in the market? 
                                    Customer traction in form of early orders, paid pilots, etc.?
                                </label>
                            </div>
                            <div className="Ranking">
                                    <p>Ranking: </p>
                                <Field name="question4" type="number" className={'RankingField' + (errors.question4 && touched.question4 ? ' is-invalid' : '')} />
                                <ErrorMessage name="question4" component="div" className="InvalidFeedback" />
                            </div>
                            <div className="Comment">
                                <label>Comment:</label>
                                <Field name="comment4" type="textarea" className={'CommentField' + (errors.comment4 && touched.comment4 ? ' is-invalid' : '')} />

                                <ErrorMessage name="comment4" component="div" className="InvalidFeedback" />
                            </div>
                        </section>
                         
                         <section className="QuestionBox">
                            <div className="Question">
                                <label>
                                    Do the company have the vision and drive to capture the full potential of it offering and its opportunity?
                                    Do the company have the ability to be on time with its work and do the company manage its daily work the correct way?
                                </label>
                            </div>
                            <div className="Ranking">
                                <p>Ranking: </p>
                                <Field name="question5" type="number" className={'RankingField' + (errors.question5 && touched.question5 ? ' is-invalid' : '')} />
                                <ErrorMessage name="question5" component="div" className="InvalidFeedback" />
                            </div>
                            <div className="Comment">
                                <label>Comment:</label>
                                <Field name="comment5" type="textarea" className={'CommentField' + (errors.comment5 && touched.comment5 ? ' is-invalid' : '')} />
                                <ErrorMessage name="comment5" component="div" className="InvalidFeedback" />
                            </div>
                        </section>
                         
                         <section className="QuestionBox">
                            <div className="Question">
                                <label>
                                    Is it sufficient tech know-how in the company to be able to execute the product vision?
                                    Is the company able to put drawing on a paper into coding?
                                </label>
                            </div>
                            <div className="Ranking">
                                <p>Ranking: </p>
                                <Field name="question6" type="number" className={'RankingField' + (errors.question6 && touched.question6 ? ' is-invalid' : '')} />
                                <ErrorMessage name="question6" component="div" className="InvalidFeedback" />
                            </div>
                            <div className="Comment">
                                <label>Comment:</label>
                                <Field name="comment6" type="textarea" className={'CommentField' + (errors.comment6 && touched.comment6 ? ' is-invalid' : '')} />
                                <ErrorMessage name="comment6" component="div" className="InvalidFeedback" />
                            </div>
                        </section>
                         
                         <section className="QuestionBox">
                            <div className="Question">
                                <label>
                                    Do the company have an overview and understanding of its market?
                                    Is the company capuring feedback from the market? (references not only positive)
                                </label>
                            </div>
                            <div className="Ranking">
                                <p>Ranking: </p>
                                <Field name="question7" type="number" className={'RankingField' + (errors.question7 && touched.question7 ? ' is-invalid' : '')} />
                                <ErrorMessage name="question7" component="div" className="InvalidFeedback" />
                            </div>
                            <div className="Comment">
                                <label>Comment:</label>
                                <Field name="comment7" type="textarea" className={'CommentField' + (errors.comment7 && touched.comment7 ? ' is-invalid' : '')} />
                                <ErrorMessage name="comment7" component="div" className="InvalidFeedback" />
                            </div>
                        </section>
                         
                         <section className="QuestionBox">
                            <div className="Question">
                                <label>
                                    Is the company performing on sales growth metrics?
                                    Below 20% growth Y/Y is  a score =1 
                                </label>
                            </div>
                            <div className="Ranking">
                                <p>Ranking: </p>
                                <Field name="question8" type="number" className={'RankingField' + (errors.question8 && touched.question8 ? ' is-invalid' : '')} />
                                <ErrorMessage name="question8" component="div" className="InvalidFeedback" />
                            </div>
                            <div className="Comment">
                                <label>Comment:</label>
                                <Field name="comment8" type="textarea" className={'CommentField' + (errors.comment8 && touched.comment8 ? ' is-invalid' : '')} />
                                <ErrorMessage name="comment8" component="div" className="InvalidFeedback" />
                            </div>
                        </section>
                         
                         <section className="QuestionBox">
                            <div className="Question">
                                <label>
                                    Is the timing right for introducing the offering or is the company too late to the party?
                                    How is the competitive picture and has this been done before? 
                                </label>
                            </div>
                            <div className="Ranking">
                                <p>Ranking: </p>
                                <Field name="question8" type="number" className={'RankingField' + (errors.question8 && touched.question8 ? ' is-invalid' : '')} />
                                <ErrorMessage name="question8" component="div" className="InvalidFeedback" />
                            </div>
                            <div className="Comment">
                                <label>Comment:</label>
                                <Field name="comment8" type="textarea" className={'CommentField' + (errors.comment8 && touched.comment8 ? ' is-invalid' : '')} />
                                <ErrorMessage name="comment8" component="div" className="InvalidFeedback" />
                            </div>
                        </section>
                         
                         <section className="QuestionBox">
                            <div className="Question">
                                <label>
                                    Is the timing right for introducing the offering or is the company too late to the party?
                                    How is the competitive picture and has this been done before?
                                </label>
                            </div>
                            <div className="Ranking">
                                <p>Ranking: </p>
                                <Field name="question8" type="number" className={'RankingField' + (errors.question8 && touched.question8 ? ' is-invalid' : '')} />
                                <ErrorMessage name="question8" component="div" className="InvalidFeedback" />
                            </div>
                            <div className="Comment">
                                <label>Comment:</label>
                                <Field name="comment9" type="textarea" className={'CommentField' + (errors.comment9 && touched.comment9 ? ' is-invalid' : '')} />
                                <ErrorMessage name="comment9" component="div" className="InvalidFeedback" />
                            </div>
                        </section>
                         
                         <section className="QuestionBox">
                            <div className="Question">
                                <label>Is the company contributing to solving global sustainability challenges? How well is that captured in their strategy?</label>
                            </div>
                            <div className="Ranking">
                                <p>Ranking: </p>
                                <Field name="question10" type="number" className={'RankingField' + (errors.question10 && touched.question10 ? ' is-invalid' : '')} />
                                <ErrorMessage name="question10" component="div" className="InvalidFeedback" />
                            </div>
                            <div className="Comment">
                                <label>Comment:</label>
                                <Field name="comment8" type="textarea" className={'CommentField' + (errors.comment11 && touched.comment11 ? ' is-invalid' : '')} />
                                <ErrorMessage name="comment11" component="div" className="InvalidFeedback" />
                            </div>
                        </section>

                        <div className="DateSave">
                                    <label>Date of work: </label>
                                    <Field name="date" type="date" className={'DateField' + (errors.date && touched.date ? ' is-invalid' : '')} />
                                    <ErrorMessage name="date" component="div" className="invalid-feedback" />
                        </div>
                            

                      <div className="DateSave">
                            <button type="submit" disabled={isSubmitting} className={'Btn BtnMain'}>
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className={'BtnSimple'}>Cancel</Link>
                            </div>
                            </PRform>
                    
                );
            }}
        </Formik>
    );
}

export { PowerRanking };