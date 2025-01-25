﻿using ThomasKiljanczykDev.DiagnosisReportGenerator.TestBase;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Tests;

/* Inherit from this class for your domain layer tests. */
public abstract class
    
    DiagnosisReportGeneratorDomainTestBase<TStartupModule> : DiagnosisReportGeneratorTestBase<TStartupModule>
    where TStartupModule : IAbpModule;