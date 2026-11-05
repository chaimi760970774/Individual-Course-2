export function ConsentView({ agreed, onToggle, onContinue }) {
  return (
    <div className="demo">
      <div className="demo__card consent__card">
        <h1 className="demo__title consent__title">Participant Information and Consent</h1>

        <div className="consent__body">
          <h2>About the Study</h2>
          <p>
            You are invited to participate in a pre-study conducted as part of a research project at KTH Royal Institute of Technology.
          </p>
          <p>
            The purpose of this pre-study is to investigate how people perceive the behaviours and movements of virtual characters in different social interactions.
          </p>
          <p>
            The research principal for this project is KTH Royal Institute of Technology. The research has been approved by the Swedish Ethical Review Authority. The reference number is 2026-02972-01.
          </p>

          <h2>What Will You Do?</h2>
          <p>
            During the study, you will watch a series of short videos featuring virtual characters performing different actions. After watching each video, you will be asked to evaluate the character by completing a short questionnaire.
          </p>
          <p>
            The study will be conducted entirely online. No VR equipment or physical interaction is required.
          </p>
          <p>
            <strong>Estimated duration:</strong> 20 minutes
          </p>

          <h2>Voluntary Participation</h2>
          <p>
            Your participation is entirely voluntary. You may choose not to participate or stop participating at any time without giving a reason.
          </p>
          <p>
            Your decision will not affect your relationship with KTH Royal Institute of Technology.
          </p>

          <h2>Data Collection and Privacy</h2>
          <p>
            Your questionnaire responses will be collected and used for research purposes to analyse participants' perceptions of virtual characters.
          </p>
          <p>
            Your questionnaire responses and collected data will be handled in such a way that unauthorised persons cannot access them.
          </p>
          <p>
            All research data will be stored in coded form. The code key will be stored securely and separately from the research data, and only the responsible researcher will have access to the code key.
          </p>
          <p>
            Only researchers involved in the study will have access to coded research data to the extent necessary for carrying out the project.
          </p>
          <p>
            Your data will be retained for up to ten years following completion of the study.
          </p>

          <h2>GDPR and Data Protection</h2>
          <p>
            The processing of your data is governed by the General Data Protection Regulation (GDPR).
          </p>
          <p>
            Personal data are processed for scientific research purposes and for the performance of research carried out in the public interest. The legal basis for processing is that it is necessary for the performance of a task carried out in the public interest (Article 6(1)(e) GDPR).
          </p>
          <p>
            The controller responsible for your personal data is KTH Royal Institute of Technology.
          </p>
          <p>
            Under the GDPR, you have the right to obtain information, free of charge, about the personal data processed within the project and, where necessary, to have inaccuracies corrected.
          </p>
          <p>
            You may also request the erasure of your personal data or restriction of processing. However, these rights may be limited where the data are necessary for the research, as permitted by applicable law.
          </p>
          <p>
            If you have questions about your personal data, please contact the responsible researcher, Robin Palmberg (<a href="mailto:robinpa@kth.se">robinpa@kth.se</a>).
          </p>
          <p>
            The KTH Data Protection Officer can be contacted at <a href="mailto:dataskyddsombud@kth.se">dataskyddsombud@kth.se</a>.
          </p>
          <p>
            If you are dissatisfied with the way your personal data are processed, you have the right to submit a complaint to the Swedish Authority for Privacy Protection.
          </p>
          <p>
            For more information, please refer to the official EU GDPR regulation:{" "}
            <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noopener noreferrer">https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng</a>
          </p>

          <h2>Possible Risks</h2>
          <p>
            This pre-study involves watching short videos and answering questionnaires. No significant physical risks are anticipated. You may stop participating if you feel uncomfortable.
          </p>

          <h2>Contact Information</h2>
          <p>
            <strong>Responsible researcher:</strong> Robin Palmberg
            <br />
            <strong>Email:</strong> <a href="mailto:robinpa@kth.se">robinpa@kth.se</a>
          </p>

          <h2>Consent to Participate</h2>
          <p>By selecting the checkbox below, I confirm that:</p>
          <ul>
            <li>I have read and understood the information about this pre-study.</li>
            <li>I understand that my participation is voluntary.</li>
            <li>I understand how my responses will be used as described above.</li>
            <li>I agree to participate in this pre-study.</li>
          </ul>
        </div>

        <label className="consent__check">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => onToggle(e.target.checked)}
          />
          <span>I confirm that I have read and understood the participant information and voluntarily agree to participate in this pre-study.</span>
        </label>

        <button
          onClick={onContinue}
          disabled={!agreed}
          className={`demo__submit ${agreed ? "demo__submit--active" : ""}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
